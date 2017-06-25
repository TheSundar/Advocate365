from __future__ import unicode_literals
from django.db import models

CASE_STATUS = (
    ('JUDGEMENT', 'Judgement'),
    ('FAVOUR', 'Favour'),
    ('NON FAVOUR', 'Non Favour')
)


class Court(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __unicode__(self):
        return self.name


class CaseNumbers(models.Model):
    case_number = models.CharField(primary_key=True, max_length=100)

    def __unicode__(self):
        return self.case_number


class AppearingFor(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __unicode__(self):
        return self.name


class Stage(models.Model):
    stage_name = models.CharField(primary_key=True, max_length=100)

    def __unicode__(self):
        return self.stage_name


class Events(models.Model):
    case_no = models.ManyToManyField(CaseNumbers, null=False)
    court_name = models.ForeignKey(Court, null=True)
    filing_date = models.DateTimeField(default=None)
    previous_date = models.DateTimeField(default=None)
    nature_of_suite = models.CharField(max_length=200, null=False)
    name_of_the_party = models.CharField(max_length=200, null=True)
    appearing_for = models.CharField(max_length=200, null=False)
    stage = models.CharField(max_length=200, null=False)
    citation = models.CharField(null=False, max_length=100)
    description = models.CharField(null=False, max_length=300)
    remarks = models.CharField(null=False, max_length=300)

    def __unicode__(self):
        return self.case_no


# class PartyDetails(models.Model):
#     mobile = models.In