from django.shortcuts import render
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from notes.filters import ProjectFilter, ToDoFilter
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
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    # queryset = ToDo.objects.filter(is_active=True)
    serializer_class = ToDoModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()

        return Response(status=status.HTTP_200_OK)
