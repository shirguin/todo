import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from notes.models import Project, ToDo
from user.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(ObjectType):
    all_notes = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)

    note_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    notes_by_user_username = graphene.List(TodoType, username=graphene.String(required=False))

    def resolve_all_notes(self, info):
        return ToDo.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_note_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExists:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExists:
            return None

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExists:
            return None

    def resolve_notes_by_user_username(self, info, username=None):
        notes = ToDo.objects.all()
        if username:
            notes = notes.filter(user__username=username)
        return notes


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        # username = graphene.String()
        # first_name = graphene.String()
        # last_name = graphene.String()
        email = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        user = User.objects.get(pk=kwargs.get('id'))
        user.email = kwargs.get('email')
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        user = User.objects.create(**kwargs)
        return UserCreateMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:

        id = graphene.ID()

    users = graphene.List(UserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        User.objects.get(pk=kwargs.get('id')).delete()
        return UserDeleteMutation(users=User.objects.all())


class Mutation(ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
