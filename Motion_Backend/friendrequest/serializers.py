from django.contrib.auth import get_user_model
from rest_framework import serializers

from customuser.models import CustomUser
from friendrequest.models import FriendRequest

User = get_user_model()


class CustomUserFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'username']


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'requester', 'receiver', 'status', 'created']
        read_only_fields = ['requester']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['requester'] = CustomUserFriendRequestSerializer(instance.requester).data
        representation['receiver'] = CustomUserFriendRequestSerializer(instance.receiver).data
        return representation


class CreateFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['requester', 'receiver', 'status', 'created']
        read_only_fields = ['requester', 'receiver']

    def validate(self, data):
        receiver_id = self.context['view'].request.POST['receiver']
        requester_id = self.context['request'].user.id
        error_message = "User does not exist"

        try:
            friend_request = FriendRequest.objects.filter(requester_id=requester_id, receiver_id=receiver_id)
            if friend_request.exists():
                error_message = 'A request has already been sent to this user'
                raise serializers.ValidationError(error_message)

            if int(requester_id) == int(receiver_id):
                error_message = "Users can't send themselves friend requests"
                raise serializers.ValidationError(error_message)

        except User.DoesNotExist:
            raise serializers.ValidationError(error_message)

        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['requester'] = CustomUserFriendRequestSerializer(instance.requester).data
        representation['receiver'] = CustomUserFriendRequestSerializer(instance.receiver).data
        return representation
