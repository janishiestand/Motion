from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from post.permissions import ReadOnly, IsAuthorOrReadOnly
from .serializers import CustomUserSerializer

User = get_user_model()


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class UserRetrieveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated | ReadOnly]


class LoggedInUserView(RetrieveUpdateDestroyAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_object(self):
        return self.request.user
