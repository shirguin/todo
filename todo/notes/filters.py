from django_filters import rest_framework as filters

from notes.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = '__all__'


class ToDoFilter(filters.FilterSet):

    class Meta:
        model = ToDo
        fields = ['project']
