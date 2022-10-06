from django.shortcuts import render
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from notes.filters import ProjectFilter
from notes.models import Project, ToDo
from notes.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
# Первый вариант


# class ProjectModelViewSet(ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectModelSerializer
#     pagination_class = ProjectLimitOffsetPagination
#
#     def get_queryset(self):
#         name = self.request.query_params.get('name', '')
#         projects = Project.objects.all()
#         if name:
#             projects = projects.filter(name__contains=name)
#         return projects

# Второй вариант


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
