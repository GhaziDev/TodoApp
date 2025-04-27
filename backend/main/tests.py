from django.test import TestCase, Client

from main import models


from datetime import datetime
import datetime

from django.urls import reverse
import json
from main import serializer
from django.forms.models import model_to_dict
from django.core import exceptions



'''
>>>>>>> 9090723778531a73ec299f9c2e361a66bb0bca98

dict_ = {'title':'New title','desc':'New Desc','isCompleted':False,'isDeleted':False,'date':None,'color':'#c8fac8'}



'''



'''




class TodoTest(TestCase):
    def test_date_published(self):
        stored_date = '2023-04-13'
        
        return self.assertRaises(exceptions.ValidationError,models.Todo.objects.create,published=stored_date)
    def test_todo_done(self):
        todo = models.Todo.objects.create(published=datetime.now(),isDone=True,isOverdue=False)
        return self.assertIs(todo.isDone,True)
    
    def test_todo_overdue(self):
        todo = models.Todo.objects.create(published=datetime.now(),isDone=False,isOverdue=True)
        self.assertIs(todo.isOverdue,True)
    
    def test_tasks_in_todo(self):
        
        stored_date = datetime.now()
        todo = models.Todo.objects.create(published=stored_date)
        dict_['date'] = todo
        task1 = models.Task.objects.create(**dict_)
        self.assertIs(task1.date,todo)
    

class TodoViewTest(TestCase):
    def setUp(self):
        models.Todo.objects.create(published='2023-04-13')
        dict_['date'] = models.Todo.objects.get(published='2023-04-13')
        models.Task.objects.create(**dict_)

    def test_list_tasks(self):

        response = self.client.get(reverse('get',kwargs={'date':'2023-04-13'}))
        self.assertEqual(response.status_code,400) # is supposed to fail, status code is supposed to be 400
    
    def test_create_on_past_date(self):
        data = serializer.TaskSerializer(data =[model_to_dict(models.Task.objects.get(date='2023-04-13'))],many=True)
        data.is_valid()


        response = self.client.post(reverse('todo post',kwargs={'date':'2023-04-13'}),data.data,'application/json')
        self.assertEqual(response.status_code,400) #check if date already exist, means the date is past 1 day, raise 400 status code, test passed!
        self.assertContains(response,'date',status_code=400)
    def test_update_task_on_past_date(self):
        data = serializer.TaskSerializer(data=model_to_dict(models.Task.objects.get(date='2023-04-13')))
        data.is_valid()
    

        response = self.client.put(reverse('todo up',kwargs={'pk':1}),data.data,'application/json')
        self.assertEqual(response.status_code,400)
        self.assertContains(response,'task past today date',status_code=400)
    def test_del_task(self):
        response = self.client.delete(reverse('del',kwargs={'id':1}))
        self.assertEqual(response.status_code,200)

class OverdueViewTest(TestCase):
    def test_overdue_date(self):
        todo = models.Todo.objects.create(published='2023-04-13')
        response = self.client.get(reverse('overdue',kwargs={'date':todo.published}))
        self.assertEqual(response.status_code,400)
    def test_overdue_dates(self):
        todo = models.Todo.objects.create(published='2023-04-14')
        response = self.client.get(reverse('future'))
        self.assertEqual(response.status_code,400)


class DoneViewTest(TestCase):
    def test_overdue_date(self):
        todo = models.Todo.objects.create(published='2023-04-13')
        response = self.client.get(reverse('complete',kwargs={'date':todo.published}))
        self.assertEqual(response.status_code,400)
    def test_overdue_dates(self):
        todo = models.Todo.objects.create(published='2023-04-14')
        response = self.client.get(reverse('completed'))
        self.assertEqual(response.status_code,400)

class AddMoreTasksTest(TestCase):
    def setUp(self):
        models.Todo.objects.create(published='2023-04-13')
        dict_['date'] = models.Todo.objects.get(published='2023-04-13')
        models.Task.objects.create(**dict_)
    def test_task_date(self):
        data = models.Task.objects.get(title='New title')
        data = serializer.TaskSerializer(data=model_to_dict(data))
        data.is_valid()

        response = self.client.post(reverse('add',kwargs={'date':dict_['date']}),data.data,'application/json',format='json')
        self.assertEqual(response.status_code,400)
        self.assertContains(response, 'This is past today date',status_code=400)















# Create your tests here.
<<<<<<< HEAD
=======
'''



class TodoTest(TestCase):
    def setUp(self):
        todo = models.Todo.objects.create(published=datetime.datetime.now())
        models.Task.objects.create(title='Title test',desc='description test',date=todo,color='#c8fac8')

    def test_task_part_of_todo(self):
        todo = models.Todo.objects.first()

        self.assertEqual(todo,models.Task.objects.get(date=todo).date)
        

