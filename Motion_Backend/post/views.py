from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.core.mail import send_mail

from post.models import Post
from post.permissions import IsOwnerOrReadOnly
from post.serializers import PostSerializer


# Create your views here.
class ListCreatePostView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search:
            return Post.objects.filter(content__icontains=search)
        return Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

        user_email = self.request.user.email
        send_mail(
            'New post',
            'Freind made a post',
            'backend@motion.com',
            [user_email],
            fail_silently=False,
        )


class ListLoggedInUserPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
class RetrieveUpdateDeletePostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnly]