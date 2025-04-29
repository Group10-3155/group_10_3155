from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ["id","username","password"]
		extra_kwargs = {"password": {"write_only": True}}

	def create(self, validated_data):
		user = User.objects.create_user(**validated_data)
		return user	
	
class EventSerializer(serializers.ModelSerializer):
    event_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}

    def get_event_photo_url(self, obj):
        request = self.context.get('request')
        if obj.event_photo:
            return request.build_absolute_uri(obj.event_photo.url)
        return None
