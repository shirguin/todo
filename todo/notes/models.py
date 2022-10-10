from django.db import models

from user.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    link_repository = models.URLField(max_length=150, blank=True)
    users_list = models.ManyToManyField(User)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    create_date = models.DateField(auto_now_add=True)
    update_date = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.project} - {self.text}'
