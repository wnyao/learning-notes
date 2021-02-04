def timeConversion(s):
  hh, mm, ss = map(int, s[:-2].split(':'))
  aa = s[-2:]

  hh = hh % 12 + (aa.upper() == 'PM') * 12
  print(('%02d:%02d:%02d') % (hh, mm, ss))

  mTime = "{0:02d}:{1:02d}:{2:02d}".format(hh, mm, ss)
  return mTime

