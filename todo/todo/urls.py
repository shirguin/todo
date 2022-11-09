"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.views.generic import TemplateView
from drf_yasg import openapi
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
# from rest_framework.schemas import get_schema_view, openapi

from drf_yasg.views import get_schema_view

from notes.views import ProjectModelViewSet, TodoModelViewSet
from user.views import UserModelViewSet, UserListAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


schema_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version='v1',
        description='Test api',
        contact=openapi.Contact(email='admin@mail.ru'),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)


router = DefaultRouter()
router.register('users', UserModelViewSet)
# router.register('users', UserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', TodoModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),

    path('api-token-auth/', views.obtain_auth_token),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # path('api/<str:version>/users/', UserListAPIView.as_view()),
    path('api/users/v1', include('user.urls', namespace='v1')),
    path('api/users/v2', include('user.urls', namespace='v2')),

    path('swagger<str:format>/', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),

    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),

    path('redoc/', TemplateView.as_view(
        template_name='redoc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='redoc'),

    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
