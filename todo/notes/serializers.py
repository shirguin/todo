from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from notes.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        # fields = '__all__'
        exclude = ('is_active',)
