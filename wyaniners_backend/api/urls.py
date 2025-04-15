from django.urls import path
from . import views

urlpatterns = [
    path("events/", views.AllEventsView.as_view(), name="event-list"),
    path("my-events/", views.MyEventsView.as_view(), name="my-event-list"),
    path("my-events/delete/<int:pk>/", views.MyEventDeleteView.as_view(), name="event-delete"),
]
