from ics import Calendar
import requests
import re
import json
import jsbeautifier
import os


class NinerEvent:
    def __init__(self, name, start, end, lat, lng, url, location, description, host, gcal, ical):
        self.name = name
        self.start = start
        self.end = end
        self.lat = lat
        self.lng = lng
        self.url = url
        self.location = location
        self.description = description
        self.host = host
        self.gcal = gcal
        self.ical = ical

    def to_dict(self):
        return {
            "name": self.name,
            "start": self.start,
            "end": self.end,
            "lat": self.lat,
            "lng": self.lng,
            "url": self.url,
            "location": self.location,
            "description": self.description,
            "host": self.host,
            "gcal": self.gcal,
            "ical": self.ical
        }


def get_ics_data(
    ics_url='https://ninerengage.charlotte.edu/events.ics',
    print_num_events=True,
    only_with_geo=False
):
    ics_data = requests.get(ics_url).text
    ics_data = re.sub(r'(CATEGORIES:[^\n]+\n)(CATEGORIES:[^\n]+\n)+', r'\1', ics_data)
    calendar = Calendar(ics_data)

    event_list = []
    for event in calendar.events:
        if not event.name.startswith("PAL Session"):
            lat = ""
            lng = ""

            # Extract description and host
            match = re.search(
                r'^(.*?)\s*\n\s*\n\s*Hosted by:\s*(.*?)\s*\n\s*\n',
                event.description or "",
                re.DOTALL
            )
            description = match.group(1).strip() if match else ""
            organization = match.group(2).strip() if match else ""

            event_id = event.url.split("/")[-1] if event.url else ""
            gcal = f'https://ninerengage.charlotte.edu/event/{event_id}/googlepublish'
            ical = f'https://ninerengage.charlotte.edu/event/{event_id}.ics'

            if event.geo:
                lat = f"{event.geo[0]}"
                lng = f"{event.geo[1]}"

            if only_with_geo and (lat == "" or lng == ""):
                continue

            niner_event = NinerEvent(
                name=event.name,
                start=event.begin.to('utc').isoformat(),
                end=event.end.to('utc').isoformat(),
                lat=lat,
                lng=lng,
                url=event.url,
                location=event.location,
                description=description,
                host=organization,
                gcal=gcal,
                ical=ical
            )
            event_list.append(niner_event)

    if print_num_events:
        print(f"Total Events: {len(event_list)}")
        geo_count = sum(1 for e in event_list if e.lat and e.lng)
        print(f"Events with Geo Data: {geo_count}")

    return event_list


def jsonify_events(event_list, file_path="./events.json"):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    event_dicts = [event.to_dict() for event in event_list]
    json_string = json.dumps(event_dicts)
    beautified = jsbeautifier.beautify(json_string)
    with open(file_path, 'w') as file:
        file.write(beautified)


def make_events(file_path="./events.json", only_with_geo=False):
    event_list = get_ics_data(print_num_events=True, only_with_geo=only_with_geo)
    jsonify_events(event_list, file_path)


# Run the script
make_events()
