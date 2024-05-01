from rest_framework import serializers

from topic.models import Topic, Vote


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = [
            'id',
            'title',
            'description',
            'likes',
            'dislikes',
        ]
        read_only_fields = [
            'id',
            'likes',
            'dislikes',
        ]


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = [
            'topic',
            'vote',
        ]
        read_only_fields = [
            'topic',
        ]
