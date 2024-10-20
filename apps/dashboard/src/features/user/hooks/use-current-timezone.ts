export default function useCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
