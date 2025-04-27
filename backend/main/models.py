from django.db import models
import datetime
from django.core import exceptions



class Todo(models.Model):
	published = models.DateField(unique=True)
	isDone = models.BooleanField(default=False)
	isOverdue = models.BooleanField(default=False)

	def __str__(self):
		return f"{self.published}"
	
	def save(self,*args,**kwargs):
	    if datetime.date.fromisoformat(str(self.published)[0:10])<datetime.date.today():
        	raise exceptions.ValidationError('Past Date Cannot be Created in the Database')
	    super().save(*args, **kwargs)


class Task(models.Model):
	title = models.CharField(max_length=200)
	date = models.ForeignKey(Todo,on_delete=models.CASCADE,related_name='todo_date',to_field='published')
	desc = models.TextField()
	isCompleted = models.BooleanField(default=False)
	isDeleted = models.BooleanField(default=False)
	color = models.CharField(max_length=1000,
		choices=[('#c8fac8',2),('#FFF7E6',1),('#ff9082',0)]
	)


	def __str__(self):
		return str(self.color)
	
	
	