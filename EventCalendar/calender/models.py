from __future__ import unicode_literals
from django.db import models
from datetime import datetime


CASE_STATUS = (
    ('JUDGEMENT', 'Judgement'),
    ('FAVOUR', 'Favour'),
    ('NON FAVOUR', 'Non Favour')
)


class CourtNames(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __unicode__(self):
        return self.name


class Events(models.Model):
    nature_of_suite = models.CharField(max_length=200, null=False)
    filing_date = models.DateTimeField(default=datetime.now())
    case_no = models.CharField(null=False, max_length=50)
    previous_date = models.DateTimeField(default=datetime.now())
    court_name = models.ForeignKey(CourtNames, null=True)
    name_of_the_party = models.CharField(max_length=200, null=True)
    appering_for = models.CharField(max_length=200, null=False)
    stage = models.CharField(choices=CASE_STATUS, null=False, max_length=30)
    citation = models.CharField(null=False, max_length=100)
    description = models.CharField(null=False, max_length=300)
    remarks = models.CharField(null=False, max_length=300)

    def __unicode__(self):
        return self.case_no
