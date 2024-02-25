from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from friendrequest.models import FriendRequest
from friendrequest.serializers import FriendRequestSerializer, CreateFriendRequestSerializer
from post.permissions import ReadOnly

User = get_user_model()


# Create your views here.
class ListFriends(ListAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        requester_id = self.request.user.id
        queryset = FriendRequest.objects.filter(requester_id=requester_id)
        return queryset


class ListCreateFriendRequests(ListCreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        queryset = FriendRequest.objects.all()
        if queryset is not None:
            queryset = queryset.exclude(status__icontains='Acc')
        return queryset


class CreateFriendRequest(CreateAPIView):
    serializer_class = CreateFriendRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def perform_create(self, serializer):
        user_id = self.request.POST.get('receiver')
        receiver_id = User.objects.get(id=user_id)
        requester_id = self.request.user.id
        requester = User.objects.get(id=requester_id)
        serializer.save(requester=requester, receiver=receiver_id)

        receiver_email = receiver_id.email
        send_mail(
            'Friend Request Created',
            'You have a new friend request.',
            'backend@motion.com',
            [receiver_email],
            fail_silently=False,
        )


class RetrieveUpdateDeleteFriendRequestView(RetrieveUpdateDestroyAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]
    lookup_url_kwarg = 'friend_request_id'

    def get_permissions(self):
        if self.request.method != 'GET':
            return [IsAuthenticated()]
        else:
            return [ReadOnly()]

    def perform_update(self, serializer):
        statusUpdate = self.request.POST['status']
        if statusUpdate == 'Acc':
            friend_request_id = self.kwargs['friend_request_id']
            friend_request = FriendRequest.objects.get(id=friend_request_id)
            requester_email = friend_request.requester.email
            receiver_name = friend_request.receiver.username
            serializer.save()

            send_mail(
                'Accepted Friend Request',
                f"Your friend request has been accepted by {receiver_name}",
                'backend@motion.com',
                [requester_email],
                fail_silently=False,
            )