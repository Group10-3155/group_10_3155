from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics 
from rest_framework.filters import SearchFilter
from .serializers import UserSerializer, EventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event
from django.shortcuts import get_object_or_404

# View for all events
class AllEventsView(generics.ListCreateAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer
	permission_classes = [AllowAny]

	def perform_create(self, serializer):
		if serializer.is_valid():
			serializer.save(author=self.request.user)
		else:
			print(serializer.errors)

# View singular events
class SingularEventView(generics.RetrieveAPIView):
	# queryset = Event.objects.all()
	serializer_class = EventSerializer
	permission_classes = [AllowAny]

	def get_object(self):
		lookup_id = self.kwargs["pk"]

        # Try external_id first
		try:
			return Event.objects.get(external_id=lookup_id)
		except Event.DoesNotExist:
            # Fallback to primary key id
			return get_object_or_404(Event, id=lookup_id)

# View user events only
class MyEventsView(generics.ListCreateAPIView):
	serializer_class = EventSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Event.objects.filter(author=user)
	
	def perform_create(self, serializer):
		if serializer.is_valid():
			serializer.save(author=self.request.user)
		else:
			print(serializer.errors)

# View for deleting user events
class MyEventDeleteView(generics.DestroyAPIView):
	serializer_class = EventSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Event.objects.filter(author=user)
	
# For searching on browse page
class EventSearch(generics.ListAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer
	permission_classes = [AllowAny]
	filter_backends = [SearchFilter]
	search_fields = ["title", "host_organization", "location", "description", "date"]
	
class CreateUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [AllowAny]
