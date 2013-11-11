App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Province = DS.Model.extend({
  name: DS.attr('string')
});

App.City = DS.Model.extend({
  name: DS.attr('string'),
  province: DS.belongsTo('province')
});

App.Town = DS.Model.extend({
  name: DS.attr('string'),
  city: DS.belongsTo('city')
});

App.CityAdapter = DS.FixtureAdapter.extend({
  queryFixtures: function(fixtures, query, type) {
    return fixtures.filter(function(city) {
      return city.province == query.provinceId;
    })
  }
});

App.TownAdapter = DS.FixtureAdapter.extend({
  queryFixtures: function(fixtures, query, type) {
    return fixtures.filter(function(town) {
      return town.city == query.cityId;
    })
  }
});

App.ApplicationController = Ember.Controller.extend({
  province: null,
  provinces: function() {
    return this.get('store').find('province');
  }.property(),

  city: null,
  cities: function() {
    if(!this.get('province')) {
      return;
    }

    this.set('city', null);
    this.set('town', null);

    return this.get('store').findQuery('city', {
      provinceId: this.get('province.id')
    });
  }.property('province'),

  town: null,
  towns: function() {
    if(!this.get('city')) {
      return;
    }

    this.set('town', null);

    return this.get('store').findQuery('town', {
      cityId: this.get('city.id')
    });
  }.property('city')
});

App.Province.FIXTURES = [{
  id: 1,
  name: '省1'
}, {
  id: 2,
  name: '省2'
}, {
  id: 3,
  name: '省3'
}];

App.City.FIXTURES = [{
  id: 1,
  name: '市11',
  province: 1
}, {
  id: 2,
  name: '市12',
  province: 1
}, {
  id: 3,
  name: '市13',
  province: 1
}, {
  id: 4,
  name: '市21',
  province: 2
}, {
  id: 5,
  name: '市22',
  province: 2
}, {
  id: 6,
  name: '市23',
  province: 2
}, {
  id: 7,
  name: '市31',
  province: 3
}, {
  id: 8,
  name: '市32',
  province: 3
}, {
  id: 9,
  name: '市33',
  province: 3
}];

App.Town.FIXTURES = [{
  id: 1,
  name: '镇111',
  city: 1
}, {
  id: 2,
  name: '镇112',
  city: 1
}, {
  id: 3,
  name: '镇113',
  city: 1
}, {
  id: 4,
  name: '镇211',
  city: 4
}, {
  id: 5,
  name: '镇212',
  city: 4
}, {
  id: 6,
  name: '镇213',
  city: 4
}, {
  id: 7,
  name: '镇311',
  city: 7
}, {
  id: 8,
  name: '镇312',
  city: 7
}, {
  id: 9,
  name: '镇313',
  city: 7
}, {
  id: 10,
  name: '镇121',
  city: 2
}, {
  id: 11,
  name: '镇122',
  city: 2
}, {
  id: 12,
  name: '镇122',
  city: 2
}, {
  id: 13,
  name: '镇221',
  city: 5
}, {
  id: 14,
  name: '镇222',
  city: 5
}, {
  id: 15,
  name: '镇223',
  city: 5
}, {
  id: 16,
  name: '镇321',
  city: 8
}, {
  id: 17,
  name: '镇322',
  city: 8
}];
