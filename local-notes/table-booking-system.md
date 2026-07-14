# SonicSavor Table Booking System

## Table Configuration (22 tables total - can change)

| Type | Count | Capacity | Notes |
|---|---|---|---|
| Family | 5 | 6-8 people | Large groups |
| Squad | 5 | 4 people | Medium groups |
| Duo | 4 | 2 people | Couples/pairs |
| Single | 4 | 1 person | Corner tables |
| Private | 4 | - | **Current focus project** |

## Booking Flow Requirements
- Booking selection based on available tables for that registration day
- Need to show real-time availability
- Filter by table type based on party size
- Private tables are the current priority

## Development Approach
- **UI/Layout**: Build for ALL table types (Family, Squad, Duo, Single, Private)
- **Backend/Logic**: Focus on Private tables first
- **Iteration**: Add other table types to backend later

## Key Features Needed
1. Date picker for registration/booking day
2. Table availability display (all types in UI)
3. Party size input → suggest matching table types
4. Real-time availability check
5. Private table special handling (current backend focus)
