"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from main.views import TodoView, FilterByButtons,OverdueTodoView,UpdateTodoView, AddMoreTaskView,GetOverdueDatesView, GetCompletedDatesView,CompletedTodoView,GetTodoCountView
from main.apps import MainConfig
app_name = MainConfig.name

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/create/<str:date>/',TodoView.as_view({'post':'create'}),name='todo post'),
    path('todo/get/<str:date>/',TodoView.as_view({'get':'list'}),name='get'),
    path('todo/<int:pk>/',TodoView.as_view({'put':'update'}),name='todo up'),
    path('delete/<int:id>/',TodoView.as_view({'delete':'delete'}),name='del'),
    path('todo/filter/<str:date>/',FilterByButtons.as_view(),name='filter'),
    path('overdue/<str:date>/',OverdueTodoView.as_view(),name='overdue'),
    path('completed/<str:date>/',CompletedTodoView.as_view(),name='complete'),
    path('update/',UpdateTodoView.as_view(),name='update'),
    path('add/<str:date>/',AddMoreTaskView.as_view(),name='add'),
    path('future/',GetOverdueDatesView.as_view(),name='future'),
    path('future_co/',GetCompletedDatesView.as_view(),name='completed'),
    path('count/',GetTodoCountView.as_view(),name='count'),
    
     # include router object urls 
]

