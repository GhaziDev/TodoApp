from django.shortcuts import render
from .serializer import TaskSerializer, ButtonSerializer,TodoSerializer, CountSerializer
from .models import Todo,Task
from rest_framework import viewsets,views
from rest_framework.response import Response
import datetime

class FilterByButtons(views.APIView):
    serializer_class = TaskSerializer
    def post(self,request,date):
        data = ButtonSerializer(data=request.data)
        if data.is_valid():
            todo = Todo.objects.filter(published=date).filter(isOverdue=False).filter(isDone=False)
            if todo:
                if data.data['btn'] == 'Pending':
                    tasks = Task.objects.filter(date=todo[0],isCompleted=False,isDeleted=False).order_by('-color')
                    return Response(TaskSerializer(tasks,many=True).data,status=200)
                elif data.data['btn'] == 'Completed':
                    tasks = Task.objects.filter(date=todo[0],isCompleted=True,isDeleted=False).order_by('-color')
                    return Response(TaskSerializer(tasks,many=True).data,status=200)
                else:
                    tasks = Task.objects.filter(date=todo[0],isDeleted=True).order_by('-color')
                    return Response(TaskSerializer(tasks,many=True).data,status=200)
            else:
                return Response('no tasks available for this date',status=400)

class UpdateTodoView(views.APIView):
    def get(self,request):
         ov_todo = Todo.objects.filter(published__lt=datetime.datetime.now())
         for date in ov_todo:
            try:
                if len(date.todo_date.all())>len(date.todo_date.all().filter(isCompleted=True)):
                    date = Todo.objects.filter(published=str(date))
                    date.update(isOverdue=True)
                    date.update(isDone=False)
        
                else:
                    date = Todo.objects.filter(published=str(date))
                    date.update(isOverdue=False)
                    date.update(isDone=True)
            except:
                date = Todo.objects.filter(published=str(date))
                date.update(isOverdue=True)
                date.update(isDone=False)

           
         return Response("Todo lists are up to dated",status=200)



class OverdueTodoView(views.APIView):
    def get(self,request,date):
        ov_todo = Todo.objects.filter(published=date).filter(isOverdue=True)
        if not ov_todo:
            #  just in case, but in frontend the max date will be past the current day
            return Response("date is not past 1 day yet",status=400)

        return Response(TaskSerializer(ov_todo[0].todo_date.all(),many=True).data,status=200)


class CompletedTodoView(views.APIView):
    def get(self,request,date):
        ov_todo = Todo.objects.filter(published=date).filter(isDone=True)
        if not ov_todo:
            #  just in case, but in frontend the max date will be past the current day
            return Response("No completed task",status=400)

        return Response(TaskSerializer(ov_todo[0].todo_date.all(),many=True).data,status=200)


class GetOverdueDatesView(views.APIView):
    def get(self,request):
        ov_todo = Todo.objects.filter(isOverdue=True)
        if not ov_todo:
            return Response("date is not past 1 day yet",status=400)
        return Response(TodoSerializer(ov_todo,many=True).data,status=200)


class GetCompletedDatesView(views.APIView):
    def get(self,request):
        co_todo = Todo.objects.filter(isDone=True)
        if not co_todo:
            return Response('date is not past 1 day yet',status=400)        
        return Response(TodoSerializer(co_todo,many=True).data,status=200)
    

class TodoView(viewsets.ViewSet):
    serializer_class = TaskSerializer
    
    def list(self,request,date):
        todo = Todo.objects.filter(published=date).filter(isOverdue=False).filter(isDone=False)
        if not todo:
            return Response([],status=400)
        if datetime.date.fromisoformat(date)<datetime.date.today():
            return Response('Date is past today',status=400)
        tasks = Task.objects.filter(date=todo[0]).order_by('-color')
        return Response(TaskSerializer(tasks,many=True).data,status=200)
    def create(self,request,date):

        data = TaskSerializer(data=request.data, many=True)
        if data.is_valid():
            if Todo.objects.filter(published=date):
                if datetime.date.fromisoformat(date)<datetime.date.today():
                    return Response('date is past 1 day',status=400)
                date = Todo.objects.get(published=date)
                
            else:
                date = Todo.objects.create(published=date)
            
            for obj in data.data:
                task = Task.objects.create(**obj,date=date)
                print(task)
            return Response('Todo list has been created',status=200)
        else:
            return Response('Failed to create a todo list',status=400)
    
    def update(self,request,pk=None):
        data = TaskSerializer(data=request.data)
        
        if data.is_valid():

            task_inst = Task.objects.filter(id=pk)
            if task_inst:
                print(Task.objects.get(pk=pk).date)
                
                if datetime.date.fromisoformat(str(Task.objects.get(pk=pk).date.published))<datetime.date.today():
                    return Response("You can't edit a task past today date",status=400)
                task_inst.update(**data.data)
                return Response("Instance is updated.",status=200)
            return Response('Task does not exist',status=400)
            
        return Response("Instance failed to update",status=400)
    def delete(self,request,id):
        Task.objects.filter(id=id).delete()
        return Response('Task Deleted',status=200)



class AddMoreTaskView(views.APIView):
    serializer_class = TaskSerializer
    def post(self,request,date):
        data = TaskSerializer(data = request.data)

        if data.is_valid():
            if datetime.date.fromisoformat(date)<datetime.date.today():
                return Response('This is past today date',status=400)
            todo_date = Todo.objects.filter(published=date)
            if  todo_date:
                
               new_task = Task.objects.create(**data.data,date=todo_date[0])
            else:
                todo_date = Todo.objects.create(published=date)
                Task.objects.create(**data.data,date=todo_date)
            order = Task.objects.all().order_by('-color')
            return Response('new task added to the list',status=200)
        return Response('failed to add task to the list',status =400)


class GetTodoCountView(views.APIView):
    serializer_class = CountSerializer
    def get(self,request):
        comp = Todo.objects.filter(isDone=True).count()
        overdue = Todo.objects.filter(isOverdue=True).count()

        
        return Response(CountSerializer({'completed':comp,'overdue':overdue}).data,status=200)
    
        


    
            


        


	

# Create your views here.
