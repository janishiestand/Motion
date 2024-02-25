from django.urls import path

from registrationprofile.views import ListCreateRegistrationProfileView, RetrieveUpdateDeleteRegistrationProfileView

# Create your views here.
urlpatterns = [
    path('', ListCreateRegistrationProfileView.as_view()),
    path('<int:registration_id>/', RetrieveUpdateDeleteRegistrationProfileView.as_view()),
]