from rest_framework import serializers

from comment.models import Comment
from customuser.models import CustomUser


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'is_active', 'about_me', 'location', 'phone_number',
                  'avatar', 'banner', 'basic_user', 'job', 'things_user_likes',
                  'sent_request_to', 'received_request_from']


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['post', 'author', 'content', 'created']
        read_only_fields = ['author']
        extra_kwargs = {'post': {'required': False}}

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['author'] = AuthorSerializer(instance.author).data
        return representation