from django.urls import path
from . import views

urlpatterns = [
    path("events/", views.AllEventsView.as_view(), name="event-list"),
    path("events/<int:pk>/", views.SingularEventView.as_view(), name="event"),
    path("my-events/", views.MyEventsView.as_view(), name="my-event-list"),
    path("my-events/delete/<int:pk>/", views.MyEventDeleteView.as_view(), name="event-delete"),
    path("search/", views.EventSearch.as_view(), name="event-search"),
]
