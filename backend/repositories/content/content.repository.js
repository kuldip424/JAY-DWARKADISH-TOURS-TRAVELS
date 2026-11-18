import Place from '../../models/place.model.js';
import Package from '../../models/package.model.js';

export const findPlaces = () => Place.find().lean();

export const findPackagesWithPlaces = () => Package.find().populate('places').lean();

export const deleteAllPlaces = () => Place.deleteMany();

export const deleteAllPackages = () => Package.deleteMany();

export const insertPlaces = (places) => Place.insertMany(places);

export const insertPackages = (packages) => Package.insertMany(packages);
