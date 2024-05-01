from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from topic.models import Topic
from topic import serializers


class TopicListCreateAPIView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = serializers.TopicSerializer


class CreateVoteAPIView(APIView):
    serializer_class = serializers.VoteSerializer

    def post(self, request, pk):
        topic = get_object_or_404(
            Topic,
            pk=pk,
        )
        serializer = self.serializer_class(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(topic=topic)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
