import json

from django.core.management import BaseCommand

from user.models import User

from todo import settings


def load_from_json(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', 'r', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_from_json('users')
        User.objects.all().delete()
        for user in users:
            User.objects.create(**user)

        todo_admin = User.objects.create_superuser(
            username='admin',
            password='12345',
            email='admin@yandex.ru'
        )
