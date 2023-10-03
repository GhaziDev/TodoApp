# Generated by Django 3.2.6 on 2023-03-31 12:31

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_task_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='tasks',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, related_name='todo_tasks', to='main.todo', to_field='published'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='todo',
            name='published',
            field=models.DateField(unique=True),
        ),
    ]
