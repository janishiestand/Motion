from rest_framework import serializers

from customuser.models import CustomUser
from post.models import Post


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'is_active', 'about_me', 'location', 'phone_number',
                  'avatar', 'banner', 'basic_user', 'job', 'things_user_likes',
                  'sent_request_to', 'received_request_from']
class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'content', 'created', 'updated', 'likes']
        read_only_fields = ['author']

        def to_representation(self, instance):
            representation = super().to_representation(instance)
            representation['author'] = AuthorSerializer(instance.author).data
            return representation