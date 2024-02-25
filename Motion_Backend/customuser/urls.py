from django.urls import path
from .views import UserListView, UserRetrieveView, LoggedInUserView

urlpatterns = [
    path("", UserListView.as_view()),
    path("<int:pk>/", UserRetrieveView.as_view()),
    path("me/", LoggedInUserView.as_view())
]