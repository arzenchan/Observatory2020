# -*- coding: utf-8 -*-
"""
Created: May 12, 2020
Author: Arzen Chan

Edited: May 26, 2020
"""



import pandas as pd
import geopandas
import numpy as np
import requests
import xml.etree.ElementTree as ET
import geojson
import json

import time
from datetime import datetime

pd.set_option('display.expand_frame_repr', True)

"""
Notes:
    
Geocoding errors are placed in the middle of the St. Lawrence River
45.432397, -73.532947
    
"""

def import_file_xml(xml_file_name, geo_ident):
    
    """Input files"""
    tree_in = ET.parse(xml_file_name) #read XML from the file
    root = tree_in.getroot()
    
    #getting categories in the XML
    #NOTE: I don't know how specific this format is to this XML file. See documentation
    columns = []
    for index, x in enumerate(root[0]):
        columns.append(root[0][index].tag)
    print ("Columns found: " + str(columns))
    
    raw_data = pd.DataFrame(columns=columns)
    
    #load data into the dataframe
    for root_index, a in enumerate(root):
        row = []
        for column_index, b in enumerate(root[root_index]):
            row.append(root[root_index][column_index].text)
        raw_data = raw_data.append(pd.Series(row, index=raw_data.columns ), ignore_index=True) #help from https://thispointer.com/python-pandas-how-to-add-rows-in-a-dataframe-using-dataframe-append-loc-iloc/
    
    #data loaded
    print (raw_data)
    
    geolocated_data = geo_code(raw_data, geo_ident)
    
    return geolocated_data
    
def to_geo_df(df):
    geo_df = geopandas.GeoDataFrame(df, geometry = geopandas.points_from_xy(df.long, df.lat))#converting to a geodataframe
    return geo_df



def geo_code(raw_data, geo_ident):
    
    """ Select 10 sample data in order to test functionality. 
    By suspending this line via making test_sample true, it will run the whole dataset"""
    
    test_sample = False #make false to run whole dataset
    if test_sample:
        raw_data = raw_data.sample(10)
    print (raw_data)
    
    
    geo_data_lat = [] #empty list to store latitude data which will be added to the dataframe
    geo_data_long = [] #empty list to store longitude data which will be added to the dataframe
    geo_data_diss = [] #empty list to store dissemination data which will be added to the dataframe
    
    for index, row in raw_data.iterrows():
        #the following code identifies which column is the 
        row_geo_data = get_address_data(row[geo_ident]) #call function to get the address
        
        #0: postal code | 1: lat | 2: long | 3: dissemination area
        geo_data_lat.append(float(row_geo_data[1]))
        geo_data_long.append(float(row_geo_data[2]))
        geo_data_diss.append(row_geo_data[3])
    
    geolocated_data = raw_data
    geolocated_data.insert(0, "lat", geo_data_lat, True) #it will insert this information at the front, standardizing the location of location information
    geolocated_data.insert(1, "long", geo_data_long, True)
    geolocated_data.insert(2, "dissemination_area", geo_data_diss, True)
    
    print (geolocated_data)
    return geolocated_data


def get_address_data(address):#using OSM Nominatim API
    """request data from nominatim"""
    
    URL = "https://nominatim.openstreetmap.org/search/"
    
    address = address.replace("Boul.", "Boulevard")
    PARAMS = {'q': address + ", Montréal",
              'format': "json"}
    
    resp = requests.get(url = URL, params = PARAMS) 
    resp = resp.text
    #print (resp)
    
    geo_data={}
    
    if resp == '[]':
        print (address +" was not found")
        geo_data[0] = address  #address saved
        geo_data[1] = 45.432397 #"Not Found"
        geo_data[2] = -73.532947 #"Not Found"
        geo_data[3] = "OSM lacks DA return" #OSM doesn't return a dissemination area. Either add that later or don't
        
        return geo_data
        
    else:
        resp_json = json.loads(resp)
        print (address + " @ " +resp_json[0]["lat"] +", "+ resp_json[0]["lon"])
    
        geo_data[0] = address  #address saved
        geo_data[1] = resp_json[0]["lat"]
        geo_data[2] = resp_json[0]["lon"]
        geo_data[3] = "OSM lacks DA return" #OSM doesn't return a dissemination area. Either add that later or don't
        
        return geo_data
    
    
def get_address_data_G(address):
    """request data from geocoder.ca"""
    
    address_split = address.split(maxsplit=1) #address will be split into 2 strings with the first one holding the numbers
    #note the addres MUST be in the form "1234 Street"
    num = address_split[0]
    street = address_split[1]
    
    
    URL = "https://geocoder.ca"
    
    PARAMS = {'addresst': street,
              'stno': num,
              'city': "Montreal",
              'prov':"QC",
              'geoit': "XML"}
    
    print (num + " " + street)
    
    resp = requests.get(url = URL, params = PARAMS) 
    resp = resp.content.decode()
    
    root = ET.fromstring(resp)
    
    geo_data={}
    
    geo_data[0] = address
    geo_data[1] = root[0].text #lat
    geo_data[2] = root[1].text #long
    geo_data[3] = root[3][0].text #dissemination area
    
    
    print (root[0].text)#the first child of the 'geodata' root node is the latt
    print (root[1].text)#the next child is the long
    print (root[3][0].text)#the 4th node has the dissemination area as a child
    
    return geo_data

def data_out(geolocated_data, output_location):
        
    geolocated_data.to_csv(output_location+".csv")
    #df_to_geojson(geolocated_data, columns, output_location)#converts to geojson and outputs the data. Depreciated
    geo_data = to_geo_df(geolocated_data)
    geo_data.to_file(output_location+".geojson", driver='GeoJSON')
    
    print ("Process Complete")

def main():
    
    #testing file
    """
    Direct URL. This can be used to directly update the XML. Could source the data from here
    http://donnees.ville.montreal.qc.ca/dataset/a5c1f0b9-261f-4247-99d8-f28da5000688/resource/92719d9b-8bf2-4dfd-b8e0-1021ffcaee2f/download/cusersuarcherdesktopinspection-aliments-contrevenants.xml.xml
    """
    
    file_in_name = "C:/Users/Arzen/OneDrive - McGill University/2020 Work/Food Inspection Offenders/cusersuarcherdesktopinspection-aliments-contrevenants_SHORT.xml.xml"
    output_file = "C:/Users/Arzen/OneDrive - McGill University/2020 Work/Food Inspection Offenders/testOut"
    
    #For now, the type of geo ID is locked as address. 
    address_column = 'adresse'
    
    geolocated_data = import_file_xml(file_in_name, address_column)
    data_out(geolocated_data, output_file)

if __name__ == "__main__":
    main()