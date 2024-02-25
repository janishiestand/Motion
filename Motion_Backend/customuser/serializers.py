from rest_framework import serializers

from customuser.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'job', 'about_me', 'location',
                  'phone_number', 'job', 'things_user_likes', 'avatar', 'banner']
