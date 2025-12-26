import json

file_path = 'src/lib/mockData.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

conversion_rate = 84

def convert_price(item, key='price'):
    if key in item and isinstance(item[key], (int, float)):
        item[key] = item[key] * conversion_rate

# Create new list to avoid mutation issues during iteration if needed
# Destinations
for dest in data.get('destinations', []):
    convert_price(dest, 'price')

# Flights
for flight in data.get('flights', []):
    convert_price(flight, 'price')

# Hotels
for hotel in data.get('hotels', []):
    convert_price(hotel, 'pricePerNight')

# Trains
for train in data.get('trains', []):
    # Trains might have classes
    if 'classes' in train:
        for cls in train['classes']:
            convert_price(cls, 'price')

# Visas
for visa in data.get('visas', []):
    convert_price(visa, 'price')

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("Successfully converted prices to INR.")
