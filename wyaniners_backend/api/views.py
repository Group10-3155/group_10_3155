from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, EventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event

# View for all events
class AllEventsView(generics.ListAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer
	permission_classes = [AllowAny]

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
	
class CreateUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [AllowAny]
