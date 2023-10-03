from rest_framework import serializers
from .models import Task, Todo


class TodoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Todo
		fields = 'id','published',

class TaskSerializer(serializers.ModelSerializer):
	date = serializers.StringRelatedField()
	class Meta:
		model = Task
		fields = 'id','title','desc','isCompleted','isDeleted','color','date',


class CountSerializer(serializers.Serializer):
	completed = serializers.IntegerField()
	overdue = serializers.IntegerField()

class ButtonSerializer(serializers.Serializer):
	btn = serializers.CharField(max_length=100)
