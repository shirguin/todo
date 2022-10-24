from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import UserModelSerializer, UserFullModelSerializer
from .models import User


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


# class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserFullModelSerializer
        return UserModelSerializer
