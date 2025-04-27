from django.contrib import admin
from .models import Task,Todo


class TodoAdmin(admin.ModelAdmin):
	list_display ='id','published',

class TaskAdmin(admin.ModelAdmin):
		list_display = 'id','title','desc','date','isCompleted','isDeleted','color'

admin.site.register(Task, TaskAdmin)
admin.site.register(Todo,TodoAdmin)
# Register your models here.
