from django.shortcuts import render
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from notes.filters import ProjectFilter, ToDoFilter
from notes.models import Project, ToDo
from notes.serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.permissions import AllowAny, BasePermission


class SuperUserOnly(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


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
    # filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination
    permission_classes = [SuperUserOnly]

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
