from rest_framework import serializers

from basicuser.models import BasicUser


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email']