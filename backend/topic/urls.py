from django.urls import path

from topic import views


urlpatterns = [
    path('topics/', views.TopicListCreateAPIView.as_view()),
    path('topics/<int:pk>/vote/', views.CreateVoteAPIView.as_view()),
]
