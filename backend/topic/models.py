from django.db.models import F
from django.db.models.signals import post_save
from django.db import models
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class Topic(models.Model):
    title = models.CharField(
        max_length=255,
    )
    description = models.CharField(
        max_length=1024,
    )
    likes = models.PositiveBigIntegerField(
        default=0,
    )
    dislikes = models.PositiveBigIntegerField(
        default=0,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = (
            '-likes',
        )
        verbose_name = _('Topic')
        verbose_name_plural = _('Topics')


class Vote(models.Model):
    class VoteChoices(models.TextChoices):
        like = 'l', _('like')
        dislike = 'd', _('dislike')

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name='votes',
    )
    vote = models.CharField(
        max_length=12,
        choices=VoteChoices.choices,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        choices = dict(self.VoteChoices.choices)
        return f"{self.topic} | {choices[self.vote]}"

    class Meta:
        verbose_name = _('Vote')
        verbose_name_plural = _('Votes')


@receiver(post_save, sender=Vote)
def update_votes(sender, instance: Vote, created, **kwargs):
    if created is False:
        return
    if instance.vote == Vote.VoteChoices.like:
        instance.topic.likes = F("likes") + 1
        instance.topic.save()
    if instance.vote == Vote.VoteChoices.dislike:
        instance.topic.dislikes = F("dislikes") + 1
        instance.topic.save()
