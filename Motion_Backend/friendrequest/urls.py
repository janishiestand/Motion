from django.urls import path

from friendrequest.views import ListFriends, ListCreateFriendRequests, CreateFriendRequest, \
    RetrieveUpdateDeleteFriendRequestView

urlpatterns = [
    path('', ListFriends.as_view()),
    path('requests/', ListCreateFriendRequests.as_view()),
    path('request/', CreateFriendRequest.as_view()),
    path('requests/<int:friend_request_id>/', RetrieveUpdateDeleteFriendRequestView.as_view()),
]