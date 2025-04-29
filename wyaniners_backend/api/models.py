from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    external_id = models.CharField(max_length=20, unique=True, null=True, blank=True)

    event_photo = models.ImageField(upload_to="event-photos/", null=True, blank=True, default="event-photos/uncc.png")
    title = models.CharField(max_length=100)
    host_organization = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=100)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events", null=True, blank=True)

    def __str__(self):
        return self.title