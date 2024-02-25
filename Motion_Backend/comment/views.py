from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from comment.models import Comment
from comment.serializers import CommentSerializer
from post.models import Post


# Create your views here.
class ListCreateCommentAPIView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['post_id'])

    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        post_instance = Post.objects.get(id=post_id)
        serializer.save(author=self.request.user, post=post_instance)
