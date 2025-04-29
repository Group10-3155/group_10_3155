from django.core.management.base import BaseCommand
from api.models import Event
from datetime import datetime
import pytz
import json

class Command(BaseCommand):
    help = 'Import events from a JSON file'

    def handle(self, *args, **kwargs):
        with open('../wya-niners/src/data/events.json') as f:
            events = json.load(f)

        utc = pytz.UTC
        eastern = pytz.timezone('America/New_York')

        for e in events:
            try:
                start_utc = datetime.fromisoformat(e["start"].replace("Z", "+00:00")).astimezone(utc)
                end_utc = datetime.fromisoformat(e["end"].replace("Z", "+00:00")).astimezone(utc)

                # Convert to Eastern Time
                start_local = start_utc.astimezone(eastern)
                end_local = end_utc.astimezone(eastern)

                external_id = e["url"].split("/")[-1] if "url" in e else None

                # Build event data dynamically
                event_data = {
                    "external_id": external_id,
                    "title": e.get("name", "Untitled"),
                    "host_organization": e.get("host", ""),
                    "date": start_local.date(),
                    "start_time": start_local.time(),
                    "end_time": end_local.time(),
                    "location": e.get("location", ""),
                    "description": e.get("description", ""),
                }

                # Only include event_photo if it's present
                if e.get("event_photo"):
                    event_data["event_photo"] = e["event_photo"]

                Event.objects.create(**event_data)
                self.stdout.write(self.style.SUCCESS(f"Imported: {e.get('name')}"))
            except Exception as ex:
                self.stdout.write(self.style.ERROR(f"Failed: {e.get('name')} — {ex}"))
