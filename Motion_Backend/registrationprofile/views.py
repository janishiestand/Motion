from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from post.permissions import ReadOnly, IsAuthorOrReadOnly
from registrationprofile.models import RegistrationProfile
from registrationprofile.serializers import RegistrationProfileSerializer

User = get_user_model()


class ListCreateRegistrationProfileView(ListCreateAPIView):
    queryset = RegistrationProfile.objects.all()
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = RegistrationProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDeleteRegistrationProfileView(RetrieveUpdateDestroyAPIView):
    queryset = RegistrationProfile.objects.all()
    serializer_class = RegistrationProfileSerializer
    permission_classes = [IsAuthenticated | ReadOnly]
    lookup_url_kwarg = 'registration_id'

    def get_permissions(self):
        if self.request.method != 'GET':
            return [IsAuthorOrReadOnly()]
        else:
            return [AllowAny()]
