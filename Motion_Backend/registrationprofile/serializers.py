from django.contrib.auth import get_user_model
from rest_framework import serializers

from registrationprofile.models import RegistrationProfile

User = get_user_model()


class RegistrationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationProfile
        fields = ['id', 'user']
