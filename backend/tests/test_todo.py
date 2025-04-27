from django.test import TestCase
from main import models
import datetime


class TodoTest(TestCase):
    def setUp(self):
        todo = models.Todo.objects.create(published=datetime.datetime.now())
        models.Task.objects.create(title='Title test',description='description test',date=todo,color='#c8fac8')

    def test_task_part_of_todo(self):
        todo = models.Todo.objects.first()

        self.assertEqual(todo,models.Task.objects.get(date=todo))
        