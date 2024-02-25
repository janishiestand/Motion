from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

from motion_backend import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Django API",
        default_version='v1',
        description="Description of your Django App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny]
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("social/friends/", include("friendrequest.urls")),
    path("post/", include('post.urls')),
    path("comment/", include('comment.urls')),
    path("api/users/", include("customuser.urls")),
    path("/auth/registration/", include("registrationprofile.urls")),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
